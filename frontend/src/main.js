// Arquivo principal da aplicação
import './styles.css';

// URL base da API
const API_BASE = 'http://localhost:8080';

// Elementos do DOM
const systemStatusEl = document.getElementById('system-status');
const inventoryListEl = document.getElementById('inventory-list');
const addItemForm = document.getElementById('add-item-form');

// Inicializa a aplicação
document.addEventListener('DOMContentLoaded', () => {
    loadSystemStatus();
    loadInventoryItems();
    
    // Manipula o envio do formulário
    addItemForm.addEventListener('submit', handleAddItem);
});

// Carrega o status do sistema
async function loadSystemStatus() {
    try {
        const response = await fetch(`${API_BASE}/health`);
        const data = await response.json();
        
        systemStatusEl.innerHTML = `
            <p><strong>Status:</strong> <span class="status-active">ONLINE</span></p>
            <p><strong>Última Verificação:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
        `;
    } catch (error) {
        systemStatusEl.innerHTML = `
            <p><strong>Status:</strong> <span class="status-inactive">OFFLINE</span></p>
            <p>Não foi possível conectar ao sistema.</p>
        `;
    }
}

// Carrega os itens de estoque
async function loadInventoryItems() {
    try {
        const response = await fetch(`${API_BASE}/inventario`);
        const items = await response.json();
        
        if (items.length === 0) {
            inventoryListEl.innerHTML = '<p>Nenhum item no estoque.</p>';
            return;
        }
        
        renderInventoryTable(items);
    } catch (error) {
        inventoryListEl.innerHTML = '<p>Erro ao carregar itens de estoque.</p>';
    }
}

// Renderiza a tabela de estoque
function renderInventoryTable(items) {
    let html = `
        <table class="table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>SKU</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                    <th>Validade</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    items.forEach(item => {
        html += `
            <tr>
                <td>${item.nome}</td>
                <td>${item.sku}</td>
                <td>${item.quantidade}</td>
                <td>R$${item.preco.toFixed(2)}</td>
                <td>${item.validade ? new Date(item.validade).toLocaleDateString() : 'N/A'}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteItem('${item._id}')">Excluir</button>
                </td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    inventoryListEl.innerHTML = html;
}

// Manipula o envio do formulário de adicionar item
async function handleAddItem(e) {
    e.preventDefault();
    
    const formData = new FormData(addItemForm);
    const itemData = {
        nome: formData.get('nome'),
        sku: formData.get('sku'),
        quantidade: parseInt(formData.get('quantidade')),
        preco: parseFloat(formData.get('preco')),
        validade: formData.get('validade') || undefined
    };
    
    try {
        const response = await fetch(`${API_BASE}/inventario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemData)
        });
        
        if (response.ok) {
            addItemForm.reset();
            loadInventoryItems();
            alert('Item adicionado com sucesso!');
        } else {
            const error = await response.json();
            alert(`Erro ao adicionar item: ${error.error || 'Erro desconhecido'}`);
        }
    } catch (error) {
        alert(`Erro ao adicionar item: ${error.message}`);
    }
}

// Exclui um item
async function deleteItem(id) {
    if (!confirm('Tem certeza que deseja excluir este item?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/inventario/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadInventoryItems();
            alert('Item excluído com sucesso!');
        } else {
            const error = await response.json();
            alert(`Erro ao excluir item: ${error.error || 'Erro desconhecido'}`);
        }
    } catch (error) {
        alert(`Erro ao excluir item: ${error.message}`);
    }
}

// Torna as funções disponíveis globalmente para manipuladores de eventos inline
window.deleteItem = deleteItem;
window.loadInventoryItems = loadInventoryItems;