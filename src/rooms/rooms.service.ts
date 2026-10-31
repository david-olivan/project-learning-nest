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

  update(id: string, updateRoomDto: UpdateRoomDto): Room {
    const targetRoom = this.getRoomOrThrow(id);
    if (updateRoomDto.name !== undefined) {
      targetRoom.name = updateRoomDto.name;
    }
    if (updateRoomDto.capacity !== undefined) {
      targetRoom.capacity = updateRoomDto.capacity;
    }
    if (updateRoomDto.equipment !== undefined) {
      targetRoom.equipment = updateRoomDto.equipment;
    }
    if (updateRoomDto.isActive !== undefined) {
      targetRoom.isActive = updateRoomDto.isActive;
    }
    return structuredClone(targetRoom);
  }

  remove(id: string): void {
    const targetRoom = this.getRoomOrThrow(id);
    this.rooms.splice(this.rooms.indexOf(targetRoom), 1);
  }
}
