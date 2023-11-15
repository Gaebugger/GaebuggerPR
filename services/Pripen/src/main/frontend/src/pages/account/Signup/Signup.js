import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../../api/axiosInstance";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // 1. CSRF 토큰 받아오는 함수
    const getCsrfToken = async () => {
        const response = await axios.get('https://backapi.pri-pen.com/csrf-token');
        console.log("csrftoken is get!");
        console.log(response);
        return response.data;
    }

    // 2. handleSubmit 함수에서 CSRF 토큰 포함하여 POST 요청
    const handleSubmit = async (e) => {
        e.preventDefault();

        // const csrfToken = await getCsrfToken();
        // const headers = {
        //     'X-CSRF-TOKEN': csrfToken
        // };
        // console.log("my csrftoken is :");
        // console.log(csrfToken);
        axios.post('https://backapi.pri-pen.com/userAuthentication/signup', formData)
            .then(response => {
                console.log('Success:', response);
                alertPopup();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    const alertPopup = () => {
        const result = window.confirm("회원가입 성공! OK를 누르면 로그인 페이지로 이동합니다.");
        if (result) {
          navigate('/login');
        }
    };

    return (
        <div className="signup-container">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default Signup;
