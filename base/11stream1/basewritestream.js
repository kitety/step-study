const fs = require('fs');
const EventEmitter = require('events');
class WriteStream extends EventEmitter {
  constructor(path, options) {
    super()
    this.path = path;
    this.fd = options.fd;
    this.flags = options.flags || 'w';
    this.mode = options.mode || 0o666;
    this.encoding = options.encoding;
    this.start = options.start || 0;
    this.end = options.end;
    this.pos = this.start;
    this.writing = false;
    this.flowing = false;
    this.autoClose = true;
    this.highWaterMark = options.highWaterMark || 16 * 1024;
    this.buffer = [];
    this.length = 0;
    this.open();
  }
  open () {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) return this.emit('error', err);
      this.fd = fd;
      this.emit('open', fd)
    })
  }
  write (chunk, encoding, cb) {
    if (typeof encoding == 'function') {
      cb = encoding
      encoding = null
    }
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, this.encoding || 'utf8');
    let len = chunk.length;
    this.length += len;
    let ret = this.length < this.highWaterMark;
    if (this.writing) {
      this.buffer.push({
        chunk, encoding, cb
      })
    } else {
      this.writing = true;
      this._write(chunk, encoding, this.clearBuffer.bind(this))
    }
    return ret
  }
  _write (chunk, encoding, cb) {
    if (typeof this.fd !== 'number') {
      return this.emit('open', () => this._write(chunk, encoding, cb))
    }
    fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, written) => {
      if (err) {
        if (this.autoClose) {
          this.destory()
        }
        return this.emit('error', err)
      }
      this.length -= written;
      this.pos += written
      cb && cb();
    })
  }
  clearBuffer () {
    console.log('clearBuffer');
    let data = this.buffer.shift();
    if (data) {
      this._write(data.chunk, data.encoding, this.clearBuffer.bind(this))
    } else {
      this.writing = false;
      this.emit('drain')
    }
  }
  end () {
    if (this.autoClose) {
      this.emit('end')
      this.destory()
    }
  }
  destory () {
    fs.close(this.fd, () => {
      this.emit('close')
    })
  }
}
module.exports = WriteStream
