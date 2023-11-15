package com.example.backend.config;

import com.example.backend.dto.UserDto;
import com.example.backend.model.User;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        modelMapper.createTypeMap(UserDto.class, User.class)
                .addMappings(mapper -> mapper.map(UserDto::getPassword, User::setPasswordHash));
        return modelMapper;
    }
}