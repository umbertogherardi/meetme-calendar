import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Settings() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [deletePassword, setDeletePassword] = useState(''); // Add state for delete password
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = () => {
        const username = sessionStorage.getItem('username') || ''; // Retrieve username from session storage
        axios.post('http://localhost:3001/auth/change-password', { username, oldPassword, newPassword })
            .then(response => {
                alert('Password changed successfully');
                setOldPassword('');
                setNewPassword('');
            })
            .catch(error => {
                console.error('Error changing password:', error);
                alert('Error changing password');
            });
    };

    const handleDeleteAccount = () => {
        const username = sessionStorage.getItem('username') || ''; // Retrieve username from session storage
        const confirmDelete = window.confirm('Are you sure you want to delete your account?'); // Display confirmation dialog
        if (confirmDelete) {
            axios.post('http://localhost:3001/auth/terminate-account', { username, password: deletePassword }) // Use terminatePassword for termination
                .then(response => {
                    alert('Account deleted successfully');
                    navigate('/')
                })
                .catch(error => {
                    console.error('Error deleting account:', error);
                    alert('Error deleting account');
                });
        }
    };

    return (
        <>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <h4>Settings</h4>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

            <form style={{ width: '30rem', margin: 'auto', marginTop: '1rem' }}>
                <div className="password-change-section">
                    <h5>Change Password</h5>
                    <div className="mb-3">
                        <label htmlFor="oldPassword" className="form-label">Old Password</label>
                        <input type="password" className="form-control" id="oldPassword" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleChangePassword}>Change Password</button>
                </div>

                <div className="terminate-account-section" style={{ marginTop: '2rem' }}>
                    <h5>Delete Account</h5>
                    <div className="mb-3">
                        <label htmlFor="deletePassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="deletePassword" value={deletePassword} onChange={e => setDeletePassword(e.target.value)} />
                    </div>
                    <button type="button" className="btn btn-danger" onClick={handleDeleteAccount}>Delete Account</button>
                </div>
            </form>
        </>
    );
}

export default Settings;
