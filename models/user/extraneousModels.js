/* These are for development purposes in case I need them later */

experience: { 
		    title: {type: String, default: "Professional Experience"},
			[job],
			order: Number 
		},
		
		volunteerExperience: { 
			title: {type: String, default: "Volunteer Experience"},
			[job],
			order: Number 
		},
		
	    publications: { 
		    title: {type: String, default: "Publications"},
			[publication],
			order: Number 
		},
		
	    education: { 
		    title: {type: String, default: "Education"},
			[education],
			order: Number 
		},
		
	    skills: { 
		   
		    title: {type: String, default: "Technical Skills"},
			[skill],
			order: Number 
		}