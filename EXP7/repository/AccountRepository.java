package com.project.chatapp.repository;

import com.project.chatapp.model.Account;
import com.project.chatapp.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByUsername(String username);
    List<Account> findAllByStatus(Status status);
}
