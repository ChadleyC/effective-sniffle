import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import Card from '../components/ui/Card';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';

const Settings = () => {
  return (
    <PageLayout>
      <h1 className="font-h1 text-h1 text-on-surface mb-8">Settings</h1>
      
      <div className="max-w-4xl space-y-8">
        <section>
          <h2 className="font-h2 text-h2 mb-4">Workspace Settings</h2>
          <Card className="p-6 space-y-6">
            <InputField 
              label="Workspace Name" 
              defaultValue="Corporate Team" 
            />
            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="font-h2 text-h2 mb-4">Notifications</h2>
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-bold text-slate-900">Email Notifications</p>
                  <p className="text-body-sm text-slate-500">Receive daily summaries of your tasks.</p>
                </div>
                <input type="checkbox" className="h-5 w-5 text-primary rounded border-slate-300" defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2 border-t border-slate-100">
                <div>
                  <p className="font-bold text-slate-900">Push Notifications</p>
                  <p className="text-body-sm text-slate-500">Get notified when someone assigns a task to you.</p>
                </div>
                <input type="checkbox" className="h-5 w-5 text-primary rounded border-slate-300" defaultChecked />
              </div>
            </div>
          </Card>
        </section>
      </div>
    </PageLayout>
  );
};

export default Settings;
