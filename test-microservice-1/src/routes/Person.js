
import {Router} from 'express';
import {personSchema} from '../utility/PersonValidation.js';
import {personControllrer} from '../controllers/Person.js'
export class Person{
    constructor(app) {

        this.router = Router();
    }
    configureRoutes(){
        this.router.route('/health').get((request,response)=>{
            console.log('The url',request)
            response.status(200).json({message:"Running"})
        });
        this.router.route('/person/create').post(this.personValidation,personControllrer.addPerson,personControllrer.personCreated)
        this.router.route('/person/all').get(personControllrer.getAllPerson)
        return this.router
    }
    personValidation(request,response,next){
        try {

           const validations = personSchema.validate(request.body);

            if(validations.error){
                response.status(500).json({error:validations.error.message})
            }
            else{
                next()
            }

        }catch (err){

            throw  err;

            // response.status(500).json({message:"Error"});

        }

    }

}
