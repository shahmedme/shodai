import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<>
			<div className="py-4 px-6 bg-gray-900 text-gray-200">
				<div className="flex justify-between text-xs md:text-sm">
					<ul className="w-1/2 flex flex-col md:flex-row m-0">
						<li className="mr-3">
							<Link>Terms of Use</Link>
						</li>
						<li className="mr-3">
							<Link>Privacy Policy</Link>
						</li>
						<li className="mr-3">
							<Link>Advertising</Link>
						</li>
					</ul>
					<div className="w-1/2 text-right">
						&copy; 2021 All Rights Reserved by{" "}
						<a
							href="https://github.com/shakilahmmeed"
							className="font-semibold"
						>
							Shakil Ahmed
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
