import React from "react"
import cx from "classnames"

const Card = ({
	headline = "Hello world !",
	text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	open = true
}) => {
	
  const classes = cx("-s-Card", open ? '-s-Card--IsOpen' : '' )

  return (
		<div className={classes}>
			<div className="-s-Card__Image">
				<img src="assets/images/illustration.jpg" />
			</div>
			<div className="-s-Card__Headline">
				<span>{{ headline }}</span>
			</div>
			<p className="-s-Card__Text">
				{{ text }}
			</p>
		</div>
  )
}

export default Card
