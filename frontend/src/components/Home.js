import React from 'react';
import '../styles/Font.css';
import '../styles/Home.css';
import { Button, Space, Divider } from 'antd';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="Background-Frame">
        <div className="Home-Image-Background"></div>
        <div className="Gradient"></div>
        <div className="Login-Background">
            {/* <div className="Login-Frame"> */}
                {/* <div className="Login"> */}
                    <h1 className="Header-Text">go and find your teammates</h1>
                    <Link to="/login" style={{textDecoration: "none"}}>
                        <Button className="Button-Frame">
                            Sign In
                        </Button>
                    </Link>
                    <div className="Footer-Frame">
                        Don’t have an account yet ?
                        <Link className="Footer-Link" to="/register">
                            Register Now
                        </Link>
                    </div>
                        {/* </Space> */}
                    {/* </div> */}
                {/* </div> */}
            </div>
        {/* </div> */}
    </div>
  );
}

export default HomePage;
