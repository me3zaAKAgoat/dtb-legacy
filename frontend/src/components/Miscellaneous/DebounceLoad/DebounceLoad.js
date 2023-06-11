import './DebounceLoad.scss';

/* 
need so style the component more
need to also make an animation that reacts to state
need to adjust offsets and sizes and get a btter grip to find a more consistent way to stylize component
*/

const DebounceLoading = ({ isDebouncing }) => {
	return (
		<div className="debounceAnimation">
			<svg
				className="loadingSvg"
				width="100"
				height="100"
				viewBox="0 0 100 100"
			>
				<foreignObject width="100%" height="100%">
					<div className="nestedSvgWrapper">
						<svg
							className="loadingCircle"
							style={isDebouncing ? {} : { opacity: 0 }}
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							xlink="http://www.w3.org/1999/xlink"
							x="0px"
							y="0px"
							width="50px"
							height="50px"
							viewBox="0 0 50 50"
							space="preserve"
							xml="preserve"
						>
							<path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
								<animateTransform
									attributeType="XML"
									attributeName="transform"
									type="rotate"
									from="0 25 25"
									to="360 25 25"
									dur="0.9s"
									repeatCount="indefinite"
								/>
							</path>
						</svg>
					</div>
				</foreignObject>
				<path
					style={isDebouncing ? {} : { opacity: 1, strokeDashoffset: 0 }}
					className="checkmarkPath"
					d="M35,50 l10,10 l25,-25"
					strokeWidth="8"
					fill="none"
				/>
			</svg>
		</div>
	);
};

export default DebounceLoading;
