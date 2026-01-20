import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { signOut, onAuthChange, getEbookLeads, getContactMessages, updateMessageStatus, isAuthorizedEmail } from '../lib/firebase';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  timestamp: any;
  source: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  timestamp: any;
  status: string;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'leads' | 'messages'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      if (currentUser && isAuthorizedEmail(currentUser.email)) {
        setUser(currentUser);
        loadData();
      } else {
        setLocation('/admin/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setLocation]);

  const loadData = async () => {
    setLoadingData(true);
    try {
      const [leadsData, messagesData] = await Promise.all([
        getEbookLeads(),
        getContactMessages()
      ]);
      setLeads(leadsData as Lead[]);
      setMessages(messagesData as Message[]);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setLocation('/admin/login');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  const handleUpdateStatus = async (messageId: string, status: string) => {
    try {
      await updateMessageStatus(messageId, status);
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, status } : msg
      ));
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Data não disponível';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]).filter(key => key !== 'id' && key !== 'timestamp');
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          if (header === 'timestamp') return formatDate(value);
          return `"${value || ''}"`;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-terracotta-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-script text-3xl text-terracotta-600">
                Dra. Flávia Abreu
              </h1>
              <p className="font-sans text-sm text-gray-600 mt-1">
                Painel Administrativo
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium text-gray-800">{user?.displayName}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('leads')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'leads'
                    ? 'border-terracotta-600 text-terracotta-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Leads do E-book ({leads.length})
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'messages'
                    ? 'border-terracotta-600 text-terracotta-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Mensagens de Contato ({messages.length})
              </button>
            </nav>
          </div>

          {/* Actions */}
          <div className="p-4 flex items-center justify-between bg-gray-50">
            <button
              onClick={loadData}
              disabled={loadingData}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50"
            >
              <svg className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Atualizar
            </button>
            <button
              onClick={() => exportToCSV(
                activeTab === 'leads' ? leads : messages,
                activeTab === 'leads' ? 'leads_ebook' : 'mensagens_contato'
              )}
              className="flex items-center gap-2 px-4 py-2 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Content */}
        {loadingData ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-terracotta-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {activeTab === 'leads' ? (
              <LeadsTable leads={leads} formatDate={formatDate} />
            ) : (
              <MessagesTable messages={messages} formatDate={formatDate} onUpdateStatus={handleUpdateStatus} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function LeadsTable({ leads, formatDate }: { leads: Lead[]; formatDate: (timestamp: any) => string }) {
  if (leads.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Nenhum lead cadastrado ainda.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WhatsApp</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.phone || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(lead.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MessagesTable({ 
  messages, 
  formatDate, 
  onUpdateStatus 
}: { 
  messages: Message[]; 
  formatDate: (timestamp: any) => string;
  onUpdateStatus: (id: string, status: string) => void;
}) {
  if (messages.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Nenhuma mensagem recebida ainda.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WhatsApp</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mensagem</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {messages.map((message) => (
            <tr key={message.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{message.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{message.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{message.phone || '-'}</td>
              <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate">{message.message}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(message.timestamp)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <select
                  value={message.status}
                  onChange={(e) => onUpdateStatus(message.id, e.target.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${
                    message.status === 'new' ? 'bg-blue-100 text-blue-800' :
                    message.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}
                >
                  <option value="new">Nova</option>
                  <option value="read">Lida</option>
                  <option value="responded">Respondida</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
