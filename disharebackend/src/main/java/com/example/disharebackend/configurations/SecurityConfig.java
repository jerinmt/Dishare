package com.example.disharebackend.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


import com.example.disharebackend.security.ApiAuthenticationFilter;
import com.example.disharebackend.services.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    ApiAuthenticationFilter apiAuthenticationFilter;
    
    @Autowired
    CustomUserDetailsService customUserDetailsService;

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/login", "/registration", "/css/**", "/js/**", "/api/**").permitAll() // Public endpoints
                        .anyRequest().authenticated()) 
                .formLogin(form -> form
                        .loginPage("/login").loginProcessingUrl("/login")
                        .defaultSuccessUrl("/create", true).permitAll()) // Form login settings
                .logout(logout -> logout
                		.logoutUrl("/logout")
            		    .logoutSuccessUrl("/login?logout")
            		    .invalidateHttpSession(true)
            		    .clearAuthentication(true)
            		    .permitAll()
            		);
        http.addFilterBefore(apiAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        	
        return http.build();
    }
    
    

    @Autowired
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
    }
}