import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Room } from './entities/room.entity.js';
import { CreateRoomDto } from './dto/create-room.dto.js';
import { UpdateRoomDto } from './dto/update-room.dto.js';

@Injectable()
export class RoomsService {
  private readonly rooms: Room[] = [];

  private getRoomOrThrow(targetId: string): Room {
    const room = this.rooms.find((r) => r.id === targetId);
    if (room) return room;

    throw new NotFoundException(`A room with id ${targetId} was not found`);
  }

  create(createRoomDto: CreateRoomDto): Room {
    const newRoom: Room = {
      id: randomUUID(),
      name: createRoomDto.name,
      capacity: createRoomDto.capacity,
      equipment: createRoomDto.equipment ?? [],
      isActive: true,
    };
    this.rooms.push(newRoom);

    return structuredClone(newRoom);
  }

  findAll(): Room[] {
    return structuredClone(this.rooms);
  }

  findOne(id: string): Room {
    const targetRoom = this.getRoomOrThrow(id);
    return structuredClone(targetRoom);
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
