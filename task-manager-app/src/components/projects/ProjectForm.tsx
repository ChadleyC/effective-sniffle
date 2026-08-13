import React, { useState, type FormEvent } from 'react';
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import type { Project } from '../../types/Project';

interface ProjectFormProps {
    initialData?: Project | null;
    onSubmit: (data: Partial<Project>) => void;
    onCancel: () => void;
    submitting?: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ initialData, onSubmit, onCancel, submitting = false }) => {
    const [name, setName] = useState(initialData?.name ?? '');
    const [description, setDescription] = useState(initialData?.description ?? '');
    const [touched, setTouched] = useState({ name: false, description: false });

    const nameValid = name.trim().length > 0;
    const showNameError = touched.name && !nameValid;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setTouched({ name: true, description: true });
        if (!name.trim()) return;
        onSubmit({ name: name.trim(), description: description.trim() });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <InputField
                label="Project Name *"
                placeholder="e.g. Global Site Redesign"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                autoFocus
                error={showNameError ? 'Project name is required' : undefined}
                maxLength={100}
            />
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                    <label className="text-label-sm font-medium text-slate-500 ml-1">Description</label>
                    <span className="text-[10px] text-slate-400 mr-1">{description.length}/500</span>
                </div>
                <textarea
                    className="w-full py-2.5 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-primary focus:border-primary text-body-sm transition-all px-4 resize-none"
                    rows={3}
                    placeholder="What is this project about?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                    maxLength={500}
                />
            </div>
            <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="secondary" onClick={onCancel} disabled={submitting}>
                    Cancel
                </Button>
                <Button type="submit" disabled={submitting || !nameValid}>
                    {submitting ? 'Saving…' : initialData ? 'Update Project' : 'Create Project'}
                </Button>
            </div>
        </form>
    );
};

export default ProjectForm;