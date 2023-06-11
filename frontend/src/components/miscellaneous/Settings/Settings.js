import 'styles/Navbar.scss';
import { useState, useCallback, useRef } from 'react';
import { useContext } from 'react';
import { UserContext } from 'utils/useUser';
import Cropper from 'react-cropper';
import usersServices from 'services/users';
import 'cropperjs/dist/cropper.css';

const AvatarUpload = () => {
	const { user, logOut } = useContext(UserContext);
	const [newAvatarUrl, setNewAvatarUrl] = useState(null);
	const cropperRef = useRef(null);

	const getNewAvatarUrl = (e) => {
		if (e.target.files) {
			if (e.target.files[0].size < 4.2 * 10 ** 6)
				setNewAvatarUrl(URL.createObjectURL(e.target.files[0]));
			else alert('file too big');
		}
	};

	const uploadImage = async () => {
		const cropper = cropperRef.current?.cropper;
		const formData = new FormData();
		if (cropper) {
			const file = await fetch(cropper.getCroppedCanvas().toDataURL())
				.then((res) => res.blob())
				.then((blob) => {
					return new File([blob], 'newAvatar.jpeg', { type: 'image/png' });
				});
			if (file) {
				formData.append('avatar', file, 'newAvatar.jpeg');
				await usersServices(logOut)
					.updateAvatar(user.token, formData)
					.then(() => {
						setNewAvatarUrl(null);
					})
					.catch((e) => alert(e));
			}
		}
	};

	return (
		<div className="fileInput">
			<div className="avatarInput">
				<img src={`/api/avatar/${user.id}.jpeg`} alt="user"></img>
				<h2>CHANGE AVATAR</h2>
				<input
					type="file"
					accept="image/png, image/jpeg, image/jpg"
					onChange={getNewAvatarUrl}
				></input>
			</div>
			{newAvatarUrl && (
				<div className="cropperModal">
					<Cropper
						src={newAvatarUrl}
						style={{ maxHeight: 400 }}
						minCropBoxHeight={100}
						minCropBoxWidth={100}
						aspectRatio={1 / 1}
						guides={false}
						checkOrientation={false}
						ref={cropperRef}
					/>
					<button className="baseButton" onClick={uploadImage}>
						Done
					</button>
				</div>
			)}
		</div>
	);
};

const SettingsModal = ({ setSettingsOpen }) => {
	const { user, logOut } = useContext(UserContext);
	const [usernameField, setUsernameField] = useState();
	const [oldPasswordField, setOldPasswordField] = useState();
	const [newPasswordField, setNewPasswordField] = useState();

	const handleUsernameField = (e) => {
		setUsernameField(e.target.value);
	};

	const handleOPasswordField = (e) => {
		setOldPasswordField(e.target.value);
	};

	const handleNPasswordField = (e) => {
		setOldPasswordField(e.target.value);
	};

	const clearForm = useCallback(() => {
		setUsernameField('');
		setOldPasswordField('');
		setNewPasswordField('');
	}, []);

	const postForm = () => {
		const areRequirementsMet = usernameField?.length > 0;

		if (!areRequirementsMet) {
			alert('Must fill all fields');
		} else {
			// post request
			clearForm();
		}
	};

	return (
		<div
			className="fullScreenFormContainer"
			onClick={(e) => e.stopPropagation()}
		>
			<div className="settingsHeader">
				<h1>Settings</h1>
				<button
					className="svgButton leaveSettingsButton"
					onClick={() => setSettingsOpen(false)}
				>
					<svg
						width="63"
						height="64"
						viewBox="0 0 63 64"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M31.6203 60.9278C47.509 60.9278 60.5088 47.928 60.5088 32.0393C60.5088 16.1507 47.509 3.15084 31.6203 3.15084C15.7317 3.15084 2.73184 16.1507 2.73184 32.0393C2.73184 47.928 15.7317 60.9278 31.6203 60.9278Z"
							stroke="white"
							strokeWidth="4.33327"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M23.4448 40.2148L39.7958 23.864"
							stroke="white"
							strokeWidth="4.33327"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M39.7958 40.2148L23.4448 23.864"
							stroke="white"
							strokeWidth="4.33327"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</div>
			<div className="formsContainer">
				<div className="userDataForms">
					<form
						className="usernameForm"
						onSubmit={(event) => {
							event.preventDefault();
						}}
					>
						<div className="username">
							<label htmlFor="usernameInput">Username:</label>
							<input
								type="text"
								id="usernameInput"
								value={usernameField ?? ''}
								placeholder={user.username}
								onChange={handleUsernameField}
								autoComplete="off"
							/>
						</div>
						<div className="buttonsContainer">
							<button
								className="baseButton submitButton"
								type="submit"
								onClick={(e) => {
									e.preventDefault();
									// postForm();
								}}
							>
								Save Changes
							</button>
						</div>
					</form>
					<form
						className="passwordForm"
						onSubmit={(event) => {
							event.preventDefault();
						}}
					>
						<div className="oldPassword">
							<label htmlFor="oldPasswordInput">Current Password:</label>
							<input
								type="password"
								id="oldPasswordInput"
								value={oldPasswordField ?? ''}
								placeholder=""
								onChange={handleOPasswordField}
								autoComplete="off"
							/>
						</div>
						<div className="newPassword">
							<label htmlFor="newPasswordInput">New Password:</label>
							<input
								type="password"
								id="newPasswordInput"
								value={newPasswordField ?? ''}
								placeholder=""
								onChange={handleNPasswordField}
								autoComplete="off"
							/>
						</div>
						<div className="buttonsContainer">
							<button
								className="baseButton submitButton"
								type="submit"
								onClick={(e) => {
									e.preventDefault();
									// postForm();
								}}
							>
								Save Changes
							</button>
						</div>
					</form>
				</div>
				<div className="avatarForm">
					<form
						onSubmit={(event) => {
							event.preventDefault();
						}}
					>
						<AvatarUpload />
					</form>
				</div>
			</div>
		</div>
	);
};

export default SettingsModal;
