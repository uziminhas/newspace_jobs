import React from 'react';
import Typography from '@material-ui/core/Typography';
import Job from './Job';
/*
Jobs component will hold component tree
Render styling

*/


export default function Jobs({jobs}) {

	return (

		<div className="jobs">

			<Typography variant="h1">
				NewSpace jobs
			</Typography>
			{
				jobs.map(
					job => <Job job={job} />
				)
			}
		</div>

	)





}