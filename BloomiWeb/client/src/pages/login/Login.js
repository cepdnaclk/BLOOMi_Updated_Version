import React from 'react';
import '../style/login.css';

export default function Login() {
  const onFinish = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log('Received values from form: ', { email, password });
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6 img-col">
              <img src="./assets/images/main.png" className="img-fluid" alt="" />
            </div>
            <div className="col-md-7 col-lg-4 col-xl-4 offset-xl-1 form_input">
              <form onSubmit={onFinish}>
                {/* Email input */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form1Example13"
                    className="form-control form-control-lg"
                    name="email"
                  />
                  <label className="form-label" htmlFor="form1Example13">
                    Email address
                  </label>
                </div>

                {/* Password input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form1Example23"
                    className="form-control form-control-lg"
                    name="password"
                  />
                  <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label>
                </div>

                <div className="d-flex align-items-right mb-4">
                  <a href="/forgotPassword">Forgot password?</a>
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary btn-lg btn-block w-100">
                  Sign in
                </button>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>

                <a
                  className="btn btn-primary btn-lg btn-block w-100"
                  style={{ backgroundColor: '#3b5998' }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-facebook-f "></i> Continue with Google
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
