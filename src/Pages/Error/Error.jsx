import React from 'react'
import { useRouteError } from "react-router-dom";
import style from './Error.module.scss'

export default function Error() {

  const error = useRouteError();
  console.error(error);

  return (
    <div>Error</div>
  )
}
