
function RenderError(props) {
  let errors = props.errors
  let err
  if (Object.keys(errors).length > 0) {
    err = Object.keys(errors).map((key, index) => {
      return <li style={{ color:'red' }} key={index}>{errors[key]}</li>
    })
  }
  return (
    <div>
      {err}
    </div>
  )
}

export default RenderError