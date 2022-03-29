import './Popup.css';

const Popup = ({closePopup, handleDelete}) => {

    return (
        <div className='main-container'>
            <div className='main-body'>
                <h3>Are you sure you want to delete?</h3>
                <span>This process is irreversible</span>
                <br />
                <button className='delete' onClick={handleDelete}>Yes</button>
                <button onClick={closePopup}>No</button>
            </div>
        </div>
    );
};

export default Popup;