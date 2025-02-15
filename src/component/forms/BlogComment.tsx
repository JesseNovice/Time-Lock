"use client"
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

interface FormData {
   name: string;
   email: string;
   message: string;
   number: number;
   web: string;
}

const schema = yup
   .object({
      name: yup.string().required().label("Name"),
      email: yup.string().required().email().label("Email"),
      message: yup.string().required().label("Message"),
      number: yup.number().required().label("Number"),
      web: yup.string().required().label("Website"),
   })
   .required();

const BlogComment = () => {

   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });
   const onSubmit = (data: FormData) => {
      const notify = () => toast('Comment sent successfully', { position: 'top-center' });
      notify();
      reset();
   };

   return (
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
         <div className="row">
            <div className="col-lg-6">
               <div className="field-item">
                  <input type="text" {...register("name")} placeholder="Enter your name*" />
                  <p className="form_error">{errors.name?.message}</p>
               </div>
            </div>
            <div className="col-lg-6">
               <div className="field-item">
                  <input type="email" {...register("email")} placeholder="Enter your mail*" />
                  <p className="form_error">{errors.email?.message}</p>
               </div>
            </div>
            <div className="col-lg-6">
               <div className="field-item">
                  <input type="text" {...register("number")} placeholder="Enter your  number*" />
                  <p className="form_error">{errors.number?.message}</p>
               </div>
            </div>
            <div className="col-lg-6">
               <div className="field-item">
                  <input type="text" {...register("web")} placeholder="Website*" />
                  <p className="form_error">{errors.web?.message}</p>
               </div>
            </div>

            <div className="col-12">
               <div className="field-item">
                  <textarea {...register("message")} id="comments" cols={30} rows={10} placeholder="Enter your Massage*"></textarea>
                  <p className="form_error">{errors.message?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="comments-form__btn">
                  <button className="thm-btn thm-btn--gradient" type="submit">Post comment</button>
               </div>
            </div>
         </div>
      </form>
   )
}

export default BlogComment
