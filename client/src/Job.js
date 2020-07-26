import React from 'react';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';



export default function Job({job, onClick}) {


	return (
		<Paper onClick={onClick} className='job'>
			<div>
				<Typography variant='h5'>{job.title}</Typography>
				<Typography variant='h6'>{job.company}</Typography>
				<Typography>{job.location}</Typography>
			</div>
			<div>
				<Typography>{job.date_added}</Typography>
				<img className={'detail-logo'} src={job.company_logo} />

			</div>

		</Paper>
	)

}