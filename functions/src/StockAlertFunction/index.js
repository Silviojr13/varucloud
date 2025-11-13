// Stock Alert Azure Function
module.exports = async function (context, event) {
    context.log('Stock alert function triggered:', event);
    
    try {
        // Extract product information from the event
        const { productId, sku, currentQuantity, minimumQuantity } = event.payload;
        
        // In a real implementation, you would send an email or notification
        // For this example, we'll just log the alert
        context.log(`⚠️ LOW STOCK ALERT: Product ${sku} (ID: ${productId}) has fallen below minimum level.`);
        context.log(`Current quantity: ${currentQuantity}, Minimum quantity: ${minimumQuantity}`);
        
        // Send alert to procurement team (implementation would depend on your notification service)
        await sendAlertToProcurementTeam({
            productId,
            sku,
            currentQuantity,
            minimumQuantity
        });
        
        context.log(`✅ Stock alert processed for product ${sku}`);
    } catch (error) {
        context.log.error('❌ Error processing stock alert:', error.message);
    }
};

// Mock function to simulate sending alert to procurement team
async function sendAlertToProcurementTeam(alertData) {
    // In a real implementation, this would integrate with an email service or messaging system
    console.log('📧 Sending stock alert to procurement team:', alertData);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log('✅ Alert sent successfully');
}