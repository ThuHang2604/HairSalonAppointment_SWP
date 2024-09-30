import React from 'react';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBRow, MDBCol, MDBCheckbox } from 'mdb-react-ui-kit';

import './Register.css';

function RegisterPage() {
  return (
    <MDBContainer fluid className="my-2 d-flex justify-content-center align-items-center vh-100">
      <MDBRow className="g-0 align-items-center w-100">
        <MDBCol md="6" lg="5" className="d-flex justify-content-center">
          <MDBCard
            className="my-5 cascading-right w-100"
            style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)' }}
          >
            <MDBCardBody className="p-5 shadow-5 text-center">
              <h2 className="fw-bold mb-5">Sign up now</h2>

              <MDBInput wrapperClass="mb-4" label="Username" id="form3" type="username" />
              <MDBInput wrapperClass="mb-4" label="Phone number" id="form3" type="phone" />
              <MDBInput wrapperClass="mb-4" label="Password" id="form4" type="password" />

              <div className="d-flex justify-content-center mb-4">
                <MDBCheckbox name="flexCheck" value="" id="flexCheckDefault" label="Subscribe to our newsletter" />
              </div>

              <MDBBtn className="w-100 mb-4" size="md">
                sign up
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="6" lg="5" className="d-none d-md-block">
          <img
            src="https://i.pinimg.com/564x/82/bd/8b/82bd8b8197a1a7a95f7a4f7440b284cf.jpg"
            className="w-100 rounded-4 shadow-4"
            alt=""
            fluid
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default RegisterPage;
