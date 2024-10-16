package com.ssd.SSD.security;

import com.ssd.SSD.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private  final JwtRequestFilter jwtRequestFilter;
    private final UserRepository userRepository;

    @Autowired
    public SecurityConfig(UserRepository userRepository, JwtRequestFilter jwtRequestFilter) {
        this.userRepository = userRepository;
        this.jwtRequestFilter = jwtRequestFilter;

    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/auth/login", "api/auth/register").permitAll()
                        .requestMatchers("/api/auth/admin/reg", "api/auth/admin/del/").hasRole("ADMIN")

                        .requestMatchers("/api/projects/add", "api/projects/close/", "api/projects/del/",
                                "api/projects/join/").authenticated()
                        .requestMatchers("api/projects/admin/del/", "api/projects/admin/close/").hasRole("ADMIN")
                        .requestMatchers("api/projects", "api/projects/filter", "api/projects/{id}").permitAll()

                        .requestMatchers("/api/memes/add", "/api/memes/del/").authenticated()
                        .requestMatchers("/api/memes/admin/del/{id}", "api/memes/admin/memetoinspection",
                                "api/memes/admin/setislegal").hasRole("ADMIN")
                        .requestMatchers("/api/memes/{id}", "api/memes").permitAll()

                        .requestMatchers("/api/gallery/add", "/api/gallery/del/").authenticated()
                        .requestMatchers("/api/gallery/admin/del/").hasRole("ADMIN")
                        .requestMatchers("/api/gallery/{id}", "api/gallery").permitAll()

                        .requestMatchers("/api/news/add", "/api/news/del/").authenticated()
                        .requestMatchers("/api/news/admin/del/").hasRole("ADMIN")
                        .requestMatchers("/api/news/{id}", "api/news").permitAll()

                        .requestMatchers("/api/document/add", "/api/document/del/",
                                "/api/document/admin/del/").hasRole("ADMIN")
                        .requestMatchers("/api/document/{id}", "api/document").permitAll()

                        .anyRequest().authenticated()
                )
                .formLogin(formlogin -> formlogin.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsServiceImpl(userRepository);
    }
}
