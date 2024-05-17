import ticket from "../models/ticket";

class ticketService {
  // Crear un nuevo boleto en la base de datos
  static async createTicket(data) {
    const ticketCreated = new ticket(data);
    return await ticketCreated.save();
  }

  // Actualizar el uso del ticket
  static async updateTicketUsage(id, useType) {
    const ticket = await this.getTicketByID(id);
    if (!ticket) {
      throw new Error('Código QR no encontrado');
    }
    if (useType === 'entry') {
      if (ticket.eventEntryUsed) {
        throw new Error('Código QR ya utilizado para la entrada');
      }
      ticket.eventEntryUsed = true;
    } else if (useType === 'food') {
      if (ticket.foodRedemptionUsed) {
        throw new Error('Código QR ya utilizado para la comida');
      }
      ticket.foodRedemptionUsed = true;
    }
    return await ticket.save();
  }
}

module.exports = ticketService;
