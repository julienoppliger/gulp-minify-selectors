import React from "react"
import cx from "classnames"

const Card = ({
	headline = "Hello world !",
	text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	open = true
}) => {
	
  const classes = cx("a", open ? 'e' : '' )

  return (
		<div className={classes}>
			<div className="b">
				<img src="assets/images/illustration.jpg" />
			</div>
			<div className="c">
				<span>{{ headline }}</span>
			</div>
			<p className="d">
				{{ text }}
			</p>
		</div>
  )
}

export default Card
