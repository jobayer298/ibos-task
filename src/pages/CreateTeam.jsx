import React, { useEffect, useState } from "react";

const CreateTeam = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teams, setTeams] = useState([]);

  const createTeam = () => {
    const team = {
      teamName: teamName,
      selectedNames: selectedOptions,
    };
    const existingTeams = JSON.parse(localStorage.getItem("teams")) || [];
    const updatedTeams = [...existingTeams, team];
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    setTeamName("");
    setSelectedOptions([]);
    window.location.reload()
    closeModal()
  };

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    if (!selectedOptions.includes(selectedValue)) {
      setSelectedOptions([...selectedOptions, selectedValue]);
    }
    setSelectedOption("");
  };
  useEffect(() => {
    const usersData = localStorage.getItem("registeredUsers");
    if (usersData) {
      const parsedUsers = JSON.parse(usersData);
      setRegisteredUsers(parsedUsers);
    }
    const teamsData = localStorage.getItem("teams");
    if (teamsData) {
      const parsedTeams = JSON.parse(teamsData);
      setTeams(parsedTeams);
    }
  }, []);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="container mx-auto">
      {isModalOpen && (
        <div className="fixed inset-0 p-5 flex items-center justify-center z-50">
          <div
            className="modal-overlay absolute inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6 relative">
              <h1 className="text-xl font-bold mb-4">Create Team</h1>
              <input
                required
                type="text"
                placeholder="Team name"
                className="input input-bordered w-full"
                onChange={(e) => setTeamName(e.target.value)}
              />
              <select
                required
                className="select select-bordered w-full mt-2"
                value={selectedOption}
                onChange={handleChange}
              >
                <option disabled value="">
                  Team members
                </option>
                {registeredUsers.map((user, index) => (
                  <option key={index} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
              <div>
                <h3>Selected Options:</h3>
                <ul>
                  {selectedOptions.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
              </div>
              <button onClick={createTeam} className="btn btn-primary my-5">
                Create
              </button>
              <p
                className=" bg-black cursor-pointer text-white h-7 w-7 grid place-items-center rounded-full absolute top-2 right-2"
                onClick={closeModal}
              >
                X
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-row-reverse">
        <button onClick={openModal} className="btn btn-primary my-5 ">
          Create Team
        </button>
      </div>
      <div>
        <h2 className="text-2xl font-bold">Team Lists</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Team Name</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{team.teamName}</td>
                  <td>
                    <ul>
                      {team.selectedNames.map((member, memberIndex) => (
                        <li key={memberIndex}>{member}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
