import{ useState } from "react";

export const SignupView = () => {
            const [username, setUsername] = useState("");
            const [password, setPassword] = useState("");
            const [email, setEmail] = useState("");
            const [birthday, setBirthday] = useState("");
            const handleSubmit = (event) => { 
                event.preventDefault();
                const data = {
                    username: username,
                    password: password,
                    email: email,
                    birthday: birthday
                }

                fetch("https://shrouded-ocean-05047.herokuapp.com/users", {
                method:"POST",
                body: JSON.stringify(data),
                headers:{
                    "Content-Type": "application/json"
                }
                }).then((response)=> {
                    if (response.ok){
                        alert("Signup successful");
                        window.location.reload();
                    } else{
                        alert("Signup failed");
                    }
                })
            }

        

            return(   <form onSubmit={handleSubmit}>
                <h1>Signup:</h1>
      <label>
        Username:
        <input
          type="text"
          value={username}
          minLength="5"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          minLength="5"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>
      <button type="submit">Signup</button>

    </form>)


        
}