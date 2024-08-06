"use client";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { validationSchema } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

type Inputs = {
    nickname: string;
    email: string;
    password: string;
};

export function Sign() {
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<Inputs>({
        resolver: yupResolver(validationSchema),
    });

    const [generalError, setGeneralError] = useState<string | null>(null);
    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = async data => {
        try {
            const response = await axios.post('/api/controller/userCrud/signUser/userPost', data);

            if (response.status === 200) {
                router.push(`/pages/homeUser?message=${encodeURIComponent(`Sign Successful! Welcome, ${data.nickname}!`)}`);
            }
        } catch (error: any) {
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.errors;
                console.log(errorMessage);
                if (Array.isArray(errorMessage)) {
                    errorMessage.forEach((err: { field: keyof Inputs; message: string }) => {
                        setError(err.field, { type: 'server', message: err.message });
                    });
                } else if (typeof errorMessage === 'object') {
                    Object.keys(errorMessage).forEach((key) => {
                        const message = errorMessage[key];
                        setError(key as keyof Inputs, { type: 'server', message });
                    });
                }else{
                    setGeneralError(errorMessage);
                }
            }else{
                setGeneralError("Erro ao tentar se conectar ao servidor");
            }
        }finally{
            reset();
        }
    };

    return (
        <>
            <h1>Sign</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="nickname">
                        Nickname:
                        <input type="text" placeholder="Digite seu Nickname" {...register('nickname')} />
                        {errors.nickname && <p className="text-red-500">{errors.nickname.message}</p>}
                    </label>
                </div>

                <div className="form-group">
                    <label htmlFor="email">
                        E-mail:
                        <input type="text" id="email" placeholder="Digite seu e-mail" {...register('email')} />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </label>
                </div>

                <div className="form-group">
                    <label htmlFor="password">
                        Senha:
                        <input type="password" placeholder="Digite sua senha" {...register('password')} />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </label>
                </div>

                <button type="submit">Submit</button>
                {generalError && <p className="text-red-500">{generalError}</p>}
            </form>
        </>
    );
}
