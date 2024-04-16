// import { signUp } from '@/apis/auth'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { signUpSchema } from '@/utils/schema'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { AxiosError } from 'axios'
// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'sonner'
// import * as z from 'zod'
// export type SignUpInputs = z.infer<typeof signUpSchema>

// export default function Component() {
//   const navigate = useNavigate()
//   const [isLoading, setIsLoading] = useState(false)


//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm<SignUpInputs>({
//     mode: 'onBlur',
//     resolver: zodResolver(signUpSchema)
//   })

//   const onSubmit = async (data: SignUpInputs) => {
//     try {
//       navigate('/login')
//       await signUp(data)
//       toast.success('Sign up successfully!')
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         toast.error(error.response?.data.message)
//       }
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="m-auto flex items-center justify-center space-y-3 lg:p-32">
//       <form className="space-y-2 p-10" onSubmit={handleSubmit(onSubmit)}>
//         <h1 className="  font-medium md:text-2xl"> Sign up to Facebook </h1>
//         <Input className="px-3 py-4" {...register('email')} placeholder="Email" type="email" />
//         {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
//         <Input className="px-3 py-4" {...register('password')} placeholder="Password" type="password" />
//         {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
//         <hr />
//         <p className="cursor-pointer text-right text-primary underline">Forgot Password</p>
//         <p className="text-sm text-muted-foreground">
//           We’ll call or text you to confirm your number. Standard message and data rates apply.{' '}
//           <span className="text-foreground underline">Privacy Policy </span>
//         </p>
//         <Button className="w-full text-white" size="lg" type="submit" loading={isLoading}>
//           Continue
//         </Button>
//       </form>
//     </div>
//   )
// }
