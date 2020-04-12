import React from 'react';



export default function Job({job}) {

	return (

		<div>
			<div className={'job'}>
				{job.title}
			</div>

			<div className="job">
				{job.company}
			</div>
		</div>



	)





}