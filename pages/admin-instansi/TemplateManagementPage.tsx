
import React from 'react';
import { Link } from 'react-router-dom';
import { FileCode, Plus, Edit, Trash2, CheckCircle, Sparkles } from 'lucide-react';
import { MOCK_TEMPLATES } from '../../constants';

const TemplateManagementPage = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Kustomisasi Dokumen</h2>
          <p className="text-gray-500 text-sm font-medium">Sesuaikan format cetak SPPD dengan tata naskah dinas Anda.</p>
        </div>
        <Link to="/admin/templates/baru" className="bg-blue-900 text-white px-5 py-2.5 rounded-xl flex items-center space-x-2 hover:bg-blue-800 transition-all font-bold shadow-lg">
          <Plus size={18} />
          <span>Buat Template Baru</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MOCK_TEMPLATES.map((template) => (
          <div key={template.id} className={`bg-white rounded-2xl border ${template.isDefault ? 'border-blue-200' : 'border-gray-100'} shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all`}>
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${template.isDefault ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-500'}`}><FileCode size={24} /></div>
                <div className="flex space-x-2">
                  <Link to={`/admin/templates/edit/${template.id}`} className="p-2 text-gray-400 hover:text-blue-900"><Edit size={18} /></Link>
                  <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mt-2">{template.description}</p>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{template.institutionId === 'GLOBAL' ? 'Global PMK' : 'Custom Local'}</span>
              {template.isDefault && <div className="flex items-center text-xs font-bold text-emerald-600 uppercase"><CheckCircle size={14} className="mr-1.5" /> Digunakan</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateManagementPage;
