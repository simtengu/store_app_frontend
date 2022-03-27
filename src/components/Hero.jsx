import React from 'react';
import  styles from  '../styles/hero.module.css'
import "../styles/bootstrap.min.css"
const Hero = () => {
    return (
      <>
    <div className={`${styles.hero} container-fluid`}>
      <div className="container py-5">
          <div className="row py-5">
              <div className="col-md-6">
                <h1 className="font-weight-bold">
                    Welcome to <span className='text-primary'>SimpleShopApp</span> 
                </h1>
                <p style={{fontSize:'22px'}} className="text-muted">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur vel vero placeat et quibusdam at dpernatur id.</p>
                 <button className="mt-3 btn btn-primary rounded-pill">Join Us</button>
              </div>
              <div className="col-md-6"></div>
          </div>
      </div>
    </div>
      </>
    );
}
 
export default Hero;