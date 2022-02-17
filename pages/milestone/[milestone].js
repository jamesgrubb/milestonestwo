import React, { Fragment } from 'react';
import { v2 as cloudinary } from 'cloudinary';

const Milestone = ({ Video }) => {
	return <div dangerouslySetInnerHTML={{ __html: Video }}></div>;
	// return <img src={Video} alt='dancing queen' />;
};

export default Milestone;

export const getServerSideProps = async (context) => {
	console.log(process.env.CLOUDINARY_NAME);
	console.log(context.params);
	cloudinary.config({
		cloud_name: process.env.CLOUD_NAME,
		api_key: process.env.CLOUD_KEY,
		api_secret: process.env.CLOUD_SECRET,
		secure: true,
	});

	const { milestone } = context.params;
	const Video = cloudinary.video('Milestones/Video/Dancing', {
		autoplay: 'autoplay',
		loop: true,
		width: 1012,
		height: 506,
		transformation: [
			{
				overlay: 'Milestones:bg',
			},
			{
				color: '#ff8846',
				width: 1012,
				crop: 'lpad',
				overlay: {
					text: milestone,
					font_size: 500,
					font_family: 'Bogam.otf',
				},
			},
			{ flags: 'layer_apply' },

			{
				flags: 'layer_apply',
				crop: 'pad',
				width: 884,
				height: 724,
				gravity: 'north_west',
				x: 460,
				y: 233,
				background: 'red',
				start_offset: '0',
				end_offset: '3.466',
			},
		],
	});
	console.log(Video);
	return {
		props: {
			Video,
		},
	};
};
