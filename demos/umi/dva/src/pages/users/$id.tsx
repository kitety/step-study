import React from 'react'
export default function({match}:any) {
  return <div>{match.params.id}</div>;
}
