import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

const Home = () => {
    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setData({ userName: user.displayName, email: user.email });
            } else {
                navigate('/login');
            }
        })
    }, []);

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                navigate("/login");
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <section className='home-body'>
            <div className='home-container'>
                <h2 className='greeting'>Welcome to the Dashboard!</h2>

                <table className='user-detail'>
                    <tr>
                        <td> <span className="home-page-icons">👨🏻‍💻</span> username </td>
                        <td> <input
                            type="text"
                            name="username"
                            id="userName"
                            value={data.userName}
                            autoComplete="off"
                            readOnly
                        />
                        </td>
                    </tr>

                    <tr>
                        <td> <span className="home-page-icons">📧</span> email </td>
                        <td> <input
                            type="text"
                            name="email"
                            id="userEmail"
                            value={data.email}
                            autoComplete="off"
                            readOnly
                        />
                        </td>
                    </tr>

                </table>
                <button onClick={handleSignOut}>Log out</button>
            </div>
        </section>
    );
}

export default Home;