import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal } from 'react-bootstrap'

function Table() {

    // Dummy Data in the main array where data will add
    const [data, setData] = useState(
        [
            { name: "Name 1", wins: 20, loses: 14 },
            { name: "Name 2", wins: 10, loses: 4 },
            { name: "Name 3", wins: 9, loses: 12 }
        ]);

    const [newPerson, setNewPerson] = useState("")
    const [DeleteRowIndexNo, setDeleteRowIndexNo] = useState(0)
    const [ScoreRowIndexNo, setScoreRowIndexNo] = useState(0)

    // Person data with add modal popup
    const [AddPersonModal, setAddPersonModal] = useState(false)
    const addPersonModalClose = () => setAddPersonModal(false)
    const handleAddPersonModal = () => setAddPersonModal(true)

    // Delete data with modal popup
    const [DeleteModal, setDeleteModal] = useState(false)
    const hideDeleteModal = () => setDeleteModal(false)
    const showDeleteModal = (index) => {
        console.log("index", index)
        setDeleteRowIndexNo(index)
        setDeleteModal(true)
    }

    // Score increament with modal popup 
    const [scoreModal, setScoreModal] = useState(false)
    const hideScoreModal = () => setScoreModal(false)
    const showScoreModal = (index) => {
        console.log("index", index)
        setScoreRowIndexNo(index)
        setScoreModal(true)
    }

    //  When click Yes => Delete entire row
    let deleteRow = () => {
        console.log("delete", DeleteRowIndexNo)
        data.splice(DeleteRowIndexNo, 1)
        setData([...data])
        setDeleteModal(false)
    }

    // Increase score
    let increaseWins = () => {

        setScoreModal(true)
        if (ScoreRowIndexNo.isIncrease) {
            data[ScoreRowIndexNo.index].wins += 1
        } else {
            data[ScoreRowIndexNo.index].loses += 1
        }
        setData([...data])
        setScoreModal(false)

    }

    // Get a new person data through modal
    let getValue = (e) => {
        setNewPerson({ name: e.target.value, wins: 0, loses: 0 })
    }

    // When click Yes => Add a new person data in the array 
    let addPerson = () => {
        if (newPerson === "" || newPerson.name === "") {
            alert("Name Cannot be Empty")
        } else {
            console.log("newPerson", newPerson)
            data.push(newPerson)
            setData([...data])
            setNewPerson("")
            setAddPersonModal(false)
        }
    }

    return (<div
        style={{
            display: "flex",
            flexDirection: "column",
            width: "100%"
        }} >

        <div className="header">
            <img alt="logo" src={require("../logo.png").default} />
        </div>

        <div style={{ alignSelf: "center" }}>
            {/* Table to show data*/}
            <table>
                <tr>
                    <td colSpan="3"><strong>TITLE</strong></td>
                    <td colSpan="3"><button onClick={handleAddPersonModal} className="btn btn-primary">ADD PERSON</button></td>
                </tr>
                <tr>
                    <th>Participants</th>
                    <th>Win</th>
                    <th>Loses</th>
                    <th><FontAwesomeIcon icon={faArrowUp} size={'lg'} /></th>
                    <th><FontAwesomeIcon icon={faArrowDown} size={'lg'} /></th>
                    <th><FontAwesomeIcon icon={faTimes} size={'lg'} /></th>
                </tr>
                {data.map((person, index) => {
                    return (
                        <tr>
                            <td>{person.name}</td>
                            <td>{person.wins}</td>
                            <td>{person.loses}</td>
                            <td><button onClick={() => showScoreModal({ index, isIncrease: true })} className="btn btn-success"><FontAwesomeIcon icon={faArrowUp} size={'lg'} /></button></td>
                            <td><button onClick={() => showScoreModal({ index, isIncrease: false })} className="btn btn-warning"><FontAwesomeIcon icon={faArrowDown} size={'lg'} /></button></td>
                           <td><button onClick={() => showDeleteModal(index)} className="btn btn-danger"><FontAwesomeIcon icon={faTimes} size={'lg'} /></button></td>
                        </tr>
                    )
                })}
            </table>

            {/* Add person modal */}
            <Modal show={AddPersonModal} onHide={addPersonModalClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" style={{ width: "100%" }} onChange={getValue} placeholder="Please enter person's name" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={addPerson}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete person modal */}
            <Modal
                size="sm"
                show={DeleteModal} onHide={hideDeleteModal}>
                <Modal.Header style={{ alignSelf: "center" }} >
                    <Modal.Title style={{ textAlign: "center" }} >Are you sure to delete this score?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ flexDirection: "row", justifyContent: "space-between", display: "flex" }}>
                        <Button style={{ width: "40%" }} variant="primary" onClick={hideDeleteModal}>
                            No
                        </Button>
                        <Button style={{ width: "40%" }} variant="primary" onClick={() => deleteRow()}>
                            Yes
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Adjust score modal */}
            <Modal
                size="sm"
                show={scoreModal} onHide={hideScoreModal}>
                <Modal.Header style={{ alignSelf: "center" }} >
                    <Modal.Title style={{ textAlign: "center" }} >Are you sure you want to adjust the score?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ flexDirection: "row", justifyContent: "space-between", display: "flex" }}>
                        <Button style={{ width: "40%" }} variant="primary" onClick={hideScoreModal}>
                            No
                        </Button>
                        <Button style={{ width: "40%" }} variant="primary" onClick={() => increaseWins()}>
                            Yes
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    </div>
    )
}

export default Table
