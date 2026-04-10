package com.example.disharebackend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.example.disharebackend.models.Admins;
import com.example.disharebackend.repository.AdminRepository;

@Service
public class AdminDetailsService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admins admin = adminRepository.findByEmail(username);
        if (admin == null) {
            throw new UsernameNotFoundException("Admin not found");
        }
        return new AdminDetails(admin);
    }
}
