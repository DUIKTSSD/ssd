package com.ssd.SSD.security;

import com.ssd.SSD.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${ssd.domain}")
    private String domainOfFrontEnd;
    private final JwtRequestFilter jwtRequestFilter;
    private final UserRepository userRepository;

    @Autowired
    public SecurityConfig(UserRepository userRepository, JwtRequestFilter jwtRequestFilter) {
        this.userRepository = userRepository;
        this.jwtRequestFilter = jwtRequestFilter;

    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/auth/login", "api/auth/register").permitAll()
                        .requestMatchers("/api/auth/admin/reg", "api/auth/admin/del/").hasRole("ADMIN")

                        .requestMatchers("/api/projects/add", "api/projects/close/", "api/projects/del/",
                                "api/projects/join/").authenticated()
                        .requestMatchers("api/projects/admin/del/", "api/projects/admin/close/",
                                "api/projects/admin/setislegal", "api/projects/admin/toinspection").hasRole("ADMIN")
                        .requestMatchers("api/projects", "api/projects/filter", "api/projects/{id}").permitAll()

                        .requestMatchers("/api/memes/add", "/api/memes/del/").authenticated()
                        .requestMatchers("/api/memes/admin/del/{id}", "api/memes/admin/memetoinspection",
                                "api/memes/admin/setislegal").hasRole("ADMIN")
                        .requestMatchers("/api/memes/{id}", "api/memes").permitAll()

                        .requestMatchers("/api/gallery/admin/del/", "api/gallery/admin/add").hasRole("ADMIN")
                        .requestMatchers("/api/gallery/{id}", "api/gallery").permitAll()

                        .requestMatchers("/api/news/admin/del/", "api/news/admin/add").hasRole("ADMIN")
                        .requestMatchers("/api/news/{id}", "api/news").permitAll()

                        .requestMatchers("/api/document/add", "/api/document/del/",
                                "/api/document/admin/del/").hasRole("ADMIN")
                        .requestMatchers("/api/document/{id}", "api/document").permitAll()

//                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()

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

    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.addAllowedOrigin(domainOfFrontEnd); // Додайте URL вашого фронтенду
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*"); // Дозволити всі методи

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Реєстрація конфігурації CORS
        return source;
    }

    @Bean
    public CorsFilter corsFilter() {
        return new CorsFilter(corsConfigurationSource()); // Повертаємо фільтр
    }
}
