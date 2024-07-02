import {models} from '../postgresql/db.js';
export class UtilitiesController {
    static async fetchModelStructure(req, res) {
        console.log('init fetchModelStructure')
        const { modelName } = req.params;
        const model = models[modelName];
        console.log(models[modelName])

        if (model) {
            const modelAttributes = model.rawAttributes;
            const structure = Object.keys(modelAttributes).map((attribute) => ({
                name: attribute,
                type: modelAttributes[attribute].type.key,
                allowNull: modelAttributes[attribute].allowNull,
                primaryKey: modelAttributes[attribute].primaryKey || false,
                unique: modelAttributes[attribute].unique || false,
            }));
            res.json(structure);
        } else {
            res.status(404).json({ message: `Model ${modelName} not found` });
        }
    }

    static async sendMail(request,response){
         const parameters = {
            email: request.body.email,
            name: request.body.firstname,
            subject: request.body.subject,
            template: request.body.template,
            message: request.body.message
            }
        try{
            if (
            		!email || !email.trim() ||
            		!name || !name.trim() ||
            		!subject || !subject.trim() ||
            		!message || !message.trim()
	            ) {
		            return res.status(400).json({ message: 'name, email, subject and message are required' });
	              }

	const receipients = ` ${name} <${email}>`;

	res.json({ message: 'Sending email in a moment...' });

	sendEmail({ parameters.email, parameters.subject, parameters.message, parameters.template })
		.then(result => { })
		.catch(error => {
			// console.log(`Unable to send email to ${JSON.stringify({ receipients })}: ${JSON.stringify(error)}`)
		});
            
        }catch(err){
            
        }
    }
}
