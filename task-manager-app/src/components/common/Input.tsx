import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
    return (
        <div className="input-group">
            <label>{label}</label>
            <input {...props} />
            {error && <span className="error">{error}</span>}
        </div>
    );
};

export default Input;
