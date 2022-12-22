import { Controller, Get, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards';

@ApiTags('Ticket')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('ticket')
export class TicketController {
    constructor(private ticketService: TicketService) { }

    @Get()
    get_ticket() {
        return this.ticketService.getTicket();
    }
}
