
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { MOCK_TEMPLATES, MOCK_PLANS } from '../../constants';
import { FileCode, Plus, Edit, Trash2, CheckCircle, Copy, AlertCircle, Sparkles } from 'lucide-react';

const TemplateManagementPage: React.FC = () => {
  const { user, subscription } = useAuth();
  const navigate = useNavigate();
  
  const currentPlan = MOCK_PLANS.find(p => p.id === subscription?.planId);
  const canCustom = currentPlan?.hasCustomTemplates || false;

  const templates = MOCK_TEMPLATES.filter(t => t.institutionId === user?.institutionId || t.institutionId === 'GLOBAL');

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manajemen Template Dokumen</h2>
          <p className="text-gray-500 text-sm">Sesuaikan format cetak SPPD dengan tata naskah dinas institusi Anda.</p>
        </div>
        
        {canCustom ? (
          <Link 
            to="/templates/baru" 
            className="bg-blue-900 text-white px-5 py-2.5 rounded-xl flex items-center justify-center space-x-2 hover:bg-blue-800 transition-all font-bold shadow-lg"
          >
            <Plus size={18} />
            <span>Buat Template Baru</span>
          </Link>
        ) : (
          <Link 
            to="/langganan" 
            className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white px-5 py-2.5 rounded-xl flex items-center justify-center space-x-2 hover:opacity-90 transition-all font-bold shadow-lg"
          >
            <Sparkles size={18} />
            <span>Upgrade untuk Custom Template</span>
          </Link>
        )}
      </div>

      {!canCustom && (
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl mb-8 flex items-start space-x-4">
          <div className="bg-blue-200 p-2 rounded-lg text-blue-900 shrink-0"><AlertCircle size={20} /></div>
          <div>
            <p className="font-bold text-blue-900">Fitur Terbatas</p>
            <p className="text-blue-800 text-sm mt-1">
              Paket Anda ({currentPlan?.name}) hanya mendukung penggunaan template standar nasional. Upgrade ke paket Professional atau Enterprise untuk membuat template kustom tak terbatas.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div 
            key={template.id} 
            className={`bg-white rounded-2xl border ${template.isDefault ? 'border-blue-200' : 'border-gray-100'} shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${template.isDefault ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <FileCode size={24} />
                </div>
                <div className="flex space-x-2">
                  {template.institutionId !== 'GLOBAL' && (
                    <>
                      <button 
                        onClick={() => navigate(`/templates/edit/${template.id}`)}
                        className="p-2 text-gray-400 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                  {template.institutionId === 'GLOBAL' && (
                    <button className="p-2 text-gray-400 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all" title="Duplikasi">
                      <Copy size={18} />
                    </button>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
                  {template.isDefault && (
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Default</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">{template.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Versi</p>
                  <p className="text-sm font-semibold text-gray-700">v{template.version}.0</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Dibuat Pada</p>
                  <p className="text-sm font-semibold text-gray-700">{template.createdAt}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 flex items-center justify-between border-t border-gray-100">
              <div className="flex items-center text-xs font-bold uppercase tracking-wider text-gray-400">
                {template.institutionId === 'GLOBAL' ? 'Template Nasional' : 'Template Instansi'}
              </div>
              {!template.isDefault && canCustom && (
                <button className="text-xs font-bold text-blue-900 hover:underline">Jadikan Default</button>
              )}
              {template.isDefault && (
                <div className="flex items-center text-xs font-bold text-emerald-600 uppercase">
                  <CheckCircle size={14} className="mr-1.5" /> Digunakan
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateManagementPage;
