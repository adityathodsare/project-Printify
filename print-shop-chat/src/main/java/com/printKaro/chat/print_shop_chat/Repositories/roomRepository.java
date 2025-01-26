package com.printKaro.chat.print_shop_chat.Repositories;

import com.printKaro.chat.print_shop_chat.entities.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface roomRepository extends MongoRepository<Room, String> {
    Room findByRoomId(String roomId);
}
