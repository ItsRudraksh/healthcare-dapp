import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

//INTERNAL IMPORT
import Header from "./Header";
import {
  DoctorDetails2,
  DoctorDetails1,
  DoctorDetails3,
  DoctorDetails4,
  DoctorDetails5,
  Profile1,
} from "../../SVG/index";
import {
  FaStethoscope,
  TiSocialTwitter,
  TiSocialFacebook,
  TiSocialLinkedin,
} from "../../ReactICON/index";
import { FaRegCopy } from "../../ReactICON/index";
import {
  SHORTEN_ADDRESS,
  CHECK_DOCTOR_REGISTERATION,
  GET_PATIENT_APPOINTMENT,
  GET_PATIENT_APPOINTMENT_HISTORYS,
  CHECKI_IF_CONNECTED_LOAD,
  GET_DOCTOR_DETAILS,
  UPLOAD_IPFS_IMAGE,
} from "../../../Context/constants";
import Card from "./Card";
import { useStateContext } from "../../../Context/index";

const Profile = ({ user, setOpenComponent, setDoctorDetails }) => {
  const { CHECKI_IF_CONNECTED_LOAD, address, UPDATE_PROFILE_PICTURE, setLoader, notifySuccess, notifyError } = useStateContext();
  const [doctor, setDoctor] = useState();
  const [patientAppoinment, setPatientAppoinment] = useState();
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    notifySuccess("Address copied to clipboard");
  };

  const handleImageChange = async (event) => {
    try {
      setLoader(true);
      const file = event.target.files[0];
      if (file) {
        const imgUrl = await UPLOAD_IPFS_IMAGE(file);
        await UPDATE_PROFILE_PICTURE(imgUrl);
        setLoader(false);
        setShowUpdateModal(false);
        notifySuccess("Profile picture updated successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
      notifyError("Failed to update profile picture");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const address = await CHECKI_IF_CONNECTED_LOAD();
        if (address) {
          GET_PATIENT_APPOINTMENT_HISTORYS(user?.patientID).then(
            (appointment) => {
              setPatientAppoinment(appointment);
            }
          );

          GET_DOCTOR_DETAILS(user?.doctorID).then((doctor) => {
            setDoctor(doctor);
          });
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [user?.patientID, user?.doctorID]);

  return (
    <div className="container-fluid">
      <Header
        user={user}
        doctor={doctor}
        patientAppoinment={patientAppoinment}
      />
      <div className="row">
        <div className="col-xl-6 col-xxl-8">
          <div className="card">
            <div className="card-body">
              <div className="media d-sm-flex d-block text-center text-sm-start pb-4 mb-4 border-bottom">
                <div className="position-relative">
                  <img
                    alt="image"
                    className="rounded me-sm-4 me-0"
                    width={130}
                    src={user?.image}
                  />
                  <button 
                    onClick={() => setShowUpdateModal(true)}
                    className="btn btn-sm btn-primary position-absolute"
                    style={{ bottom: "5px", right: "5px" }}
                  >
                    Update
                  </button>
                </div>
                <div className="media-body align-items-center">
                  <div className="d-sm-flex d-block justify-content-between my-3 my-sm-0">
                    <div>
                      <h3 className="fs-22 text-black font-w600 mb-0">
                        {user?.title} {user?.firstName} {user?.lastName}
                      </h3>
                      <p className="mb-2 mb-sm-2">
                        {SHORTEN_ADDRESS(user?.walletAddress)}{" "}
                        <a onClick={() => copyText(user?.walletAddress)}>
                          {" "}
                          <FaRegCopy />
                        </a>
                      </p>
                    </div>
                    <span>#P00-{user?.patientID}</span>
                  </div>
                  <a
                    href="javascript:void(0);"
                    className="btn btn-primary light btn-rounded mb-2 me-2"
                  >
                    <DoctorDetails1 />
                    {user?.gender}
                  </a>
                  <a
                    href="javascript:void(0);"
                    className="btn btn-primary light btn-rounded mb-2"
                  >
                    <DoctorDetails2 />
                    {user?.city}
                  </a>
                </div>
              </div>
              <div className="row">
                <Card
                  icon={<DoctorDetails3 />}
                  title={"Address"}
                  name={user?.yourAddress}
                />
                <Card
                  icon={<DoctorDetails4 />}
                  title={"Phone"}
                  name={user?.mobile}
                />
                <Card
                  icon={<DoctorDetails5 />}
                  title={"EmailID"}
                  name={user?.emailID}
                />
                <Card
                  icon={<DoctorDetails3 />}
                  title={"Date of Birth "}
                  name={user?.birth}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-md-6">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h4 className="fs-20 font-w600">Midicial History</h4>
            </div>
            <div className="card-body">
              <div className="widget-timeline-icon2">
                <ul className="timeline">
                  {user?.medicalHistory
                    ?.map((item, index) => (
                      <li key={index}>
                        <div className="icon bg-primary">
                          <i className="las">
                            <FaStethoscope />
                          </i>
                        </div>
                        <a
                          className="timeline-panel text-muted"
                          href="javascript:void(0);"
                        >
                          <h4 className="mb-2 mt-1">{item}</h4>
                        </a>
                      </li>
                    ))
                    .slice(0, 3)}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-xxl-6">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h4 className="fs-20 font-w600">Assigned Doctor</h4>
            </div>
            <div className="card-body">
              <div className="media d-sm-flex text-sm-start d-block text-center">
                <img
                  alt="image"
                  className="rounded me-sm-4 me-0 mb-2 mb-sm-0"
                  width={130}
                  src={doctor?.image}
                />
                <div className="media-body">
                  <h3 className="fs-22 text-black font-w600 mb-0">
                    Dr.{doctor?.title} {doctor?.firstName} {doctor?.lastName}
                  </h3>
                  <p className="text-primary">{doctor?.specialization}</p>
                  <div className="social-media mb-sm-0 mb-3 justify-content-sm-start justify-content-center">
                    <a>
                      <i className="lab ms-0">
                        <TiSocialTwitter />
                      </i>
                    </a>
                    <a>
                      <i className="lab ">
                        <TiSocialLinkedin />
                      </i>
                    </a>
                    <a>
                      <i className="lab">
                        <TiSocialFacebook />
                      </i>
                    </a>
                  </div>
                </div>
                <div className="text-center">
                  <span
                    onClick={() => (
                      setDoctorDetails(doctor),
                      setOpenComponent("DoctorDetails")
                    )}
                    className="num"
                  >
                    View
                  </span>
                </div>
              </div>
              <p>{doctor?.biography.slice(0, 300)}..</p>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-xxl-6">
          <div className="card patient-detail">
            <div className="card-header border-0 pb-0">
              <h4 className="fs-20 font-w600 text-white">
                About {user?.title} {user?.firstName} {user?.lastName}
              </h4>
              <a href="javascript:void(0);">
                <Profile1 />
              </a>
            </div>
            <div className="card-body fs-14 font-w300">{user?.message}</div>
          </div>
        </div>
      </div>

      {/* Profile Picture Update Modal */}
      {showUpdateModal && (
        <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Profile Picture</h5>
                <button className="btn-close" onClick={() => setShowUpdateModal(false)} />
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label className="col-form-label">Choose New Profile Picture</label>
                  <input
                    className="form-control"
                    id="file"
                    onChange={handleImageChange}
                    type="file"
                    accept="image/*"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  className="btn btn-danger light" 
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
