import { getProviders, signIn } from "next-auth/react";
import { signOut } from "next-auth/react";

function Login({ providers }) {
    return (
        
        <div>

            {Object.values(providers).map((provider) => (
                <div key={provider.name}> 
                    <button className=""
                    onClick={() => signIn(provider.id, {callbackUrl: "/"})}>Log in with {provider.name} </button>
                    <button onClick={() => signOut()}> Sign out</button>
                </div>
            ))}
        </div>
    )
}

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    }
}