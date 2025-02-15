"use client"
import { toast } from 'react-toastify';

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

interface FormData {
   name: string;
   email: string;
   message: string;
}

const schema = yup
   .object({
      name: yup.string().required().label("Name"),
      email: yup.string().required().email().label("Email"),
      message: yup.string().required().label("Message"),
   })
   .required();

const HomeContact = () => {

   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });
   const onSubmit = (data: FormData) => {
      const notify = () => toast('Message sent successfully', { position: 'top-center' });
      notify();
      reset();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="row">
            <div className="col-lg-6">
               <input {...register("name")} type="text" placeholder="Enter Name" />
               <p className="form_error">{errors.name?.message}</p>
            </div>
            <div className="col-lg-6">
               <input type="email" {...register("email")} placeholder="Enter Mail" />
               <p className="form_error">{errors.email?.message}</p>
            </div>
            <div className="col-lg-12">
               <textarea {...register("message")} id="message" cols={30} rows={10}
                  placeholder="Enter your message..."></textarea>
               <p className="form_error">{errors.message?.message}</p>
            </div>
            <div className="ico-contact__btn text-center mt-10">
               <button className="thm-btn" type="submit">send message</button>
            </div>
         </div>

      </form>
   )
}

export default HomeContact;
