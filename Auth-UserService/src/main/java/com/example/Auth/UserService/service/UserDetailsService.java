package com.example.Auth.UserService.service;

import com.example.Auth.UserService.dto.PageResponse;
import com.example.Auth.UserService.dto.UserResponse;
import com.example.Auth.UserService.dto.UserUpdateRequest;
import com.example.Auth.UserService.entity.UserDetails;
import com.example.Auth.UserService.exception.UserNotFoundException;
import com.example.Auth.UserService.repository.UserDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDetailsService {
    private final UserDetailsRepository userDetailsRepository;
    private final ModelMapper modelMapper;

    public UserResponse updateUserProfile(Long userId, UserUpdateRequest request) {

        Optional<UserDetails> userDetails = userDetailsRepository.findByUserId(userId);
        userDetails.orElseThrow(() -> new UserNotFoundException("User not found"));




        userDetails.get().setSkills(request.getSkills());
        userDetails.get().setExperience(request.getExperience());
        userDetails.get().setBio(request.getBio());
        userDetails.get().setPortfolioLinks(request.getPortfolioLinks());
        userDetails.get().setLocation(request.getLocation());
        userDetails.get().setCompanyName(request.getCompanyName());
        userDetails.get().setUpdatedAt(LocalDateTime.now());

        UserDetails updatedUser = userDetailsRepository.save(userDetails.get());
        return modelMapper.map(updatedUser, UserResponse.class);
    }
    public UserResponse getUserById(Long userId) {
        UserDetails user = userDetailsRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return modelMapper.map(user, UserResponse.class);
    }

    public PageResponse<UserResponse> getAllUsersPage(
            int page, int size, String sortBy, String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<UserDetails> userPage = userDetailsRepository.findAll(pageable);

        List<UserResponse> userList = userPage.getContent()
                .stream()
                .map(user -> modelMapper.map(user, UserResponse.class))
                .toList();

        return new PageResponse<>(
                userList,
                userPage.getNumber(),
                userPage.getSize(),
                userPage.getTotalElements(),
                userPage.getTotalPages()
        );
    }
}
